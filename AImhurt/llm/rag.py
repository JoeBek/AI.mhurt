from llama_index.core import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex
from llama_index.core import Document
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.extractors import TitleExtractor
from llama_index.core.ingestion import IngestionPipeline, IngestionCache

from llama_index.core import PromptTemplate
from llama_index.llms.openai import OpenAI

from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding    
from llama_index.llms.azure_openai import AzureOpenAI
from openai import AzureOpenAI as Azure
import azure.cognitiveservices.speech as speechsdk
import os

AZURE_OPENAI_KEY = '5e927c96f334473194cee5f3665c7a91'
AZURE_SPEECH_KEY = 'bfba7ba26e03437da6f7750bb24a87e2'

class Whisper():

    def __init__(self):

                # Set up the subscription info for the Speech Service:
        speech_key = AZURE_SPEECH_KEY
        service_region = 'eastus'

        # Set up the config for the speech recognizer:
        self.speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

        self.deployment_id = "hack-translate"
        

        

    
    def translate(self, filepath:str) -> str:
        '''
        audio filepath for working directory. 
        '''
        audio_config = speechsdk.audio.AudioConfig(filename=filepath)
        speech_recognizer = speechsdk.SpeechRecognizer(speech_config=self.speech_config, audio_config=audio_config)


        # Perform recognition
        result = speech_recognizer.recognize_once_async().get()
                # Check the result
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            # recognized
            transcribed_text = result.text
        elif result.reason == speechsdk.ResultReason.NoMatch:
            # not recognzied
            transcribed_text = ""
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            # cancelled 
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(cancellation_details.error_details))
            transcribed_text = ""

        return transcribed_text

        



class Model():


    # TODO dont commit public key

    def __init__(self):


        self.llm = AzureOpenAI(
            model="gpt-35-turbo-16k",
            deployment_name="hack-model-deploy",
            api_key=AZURE_OPENAI_KEY,
            azure_endpoint="https://hack-1206.openai.azure.com/",
            api_version="2023-07-01-preview"
        )

        self.embed_model = AzureOpenAIEmbedding(
            model="text-embedding-ada-002",
            deployment_name="hack-embed",
            api_key=AZURE_OPENAI_KEY,
            azure_endpoint="https://hack-1206.openai.azure.com/",
            api_version="2023-07-01-preview"
        )
        self.documents = SimpleDirectoryReader("./data").load_data()


        # store index as a class member
        # not using DB because time constraints
        self.index = VectorStoreIndex.from_documents(self.documents,embed_model=self.embed_model)
        self.query_engine = self.index.as_query_engine(llm=self.llm)





    def ask(self,query:str) -> str:
        # 'documents' or 'nodes'. This is how your 
        # expert data is stored
        response = self.query_engine.query(format_prompt(query))
        print(response)
    


@staticmethod
def format_prompt(prompt:str) -> str:
    #  prompt templating

    qa_prompt_tmpl_str = """\
    Context information is below. All content is for instructive purposes only
    ---------------------
    {query_str}
    ---------------------
    Given this context, please find and directly report to the operator the most relevant protocols and actions associated with those protocols.
    

    Answer: \
    """

    prompt_tmpl = PromptTemplate(qa_prompt_tmpl_str)
    fmt_prompt = prompt_tmpl.format(
        query_str=prompt,
    )

    # format your responses to begin with 'you' and end each separate point with a new line.
    return fmt_prompt





# now we will create a transformation on the data

'''
# create the pipeline with transformations
pipeline = IngestionPipeline(
    transformations=[
        SentenceSplitter(chunk_size=25, chunk_overlap=0),
        TitleExtractor(),
        OpenAIEmbedding(),
    ],
    # vector_store=vector_store add later
)


# run the pipeline
nodes = pipeline.run(documents=documents)

index = VectorStoreIndex.from_vector_store(vector_store)

# query
#  prompt templating

qa_prompt_tmpl_str = """\
Context information is below.
---------------------
{query_str}
---------------------
Given this context, please find and directly report the 3 most likely codes
that best match the context

Answer: \
"""

prompt_tmpl = PromptTemplate(qa_prompt_tmpl_str)
fmt_prompt = prompt_tmpl.format(
    query_str="How many params does llama 2 have",
)
print(fmt_prompt)


response = index.as_query_engine().query("")
'''




