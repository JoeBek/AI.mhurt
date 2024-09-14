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



class model():


    # TODO dont commit public key

    def __init__(self):


        self.llm = AzureOpenAI(
            model="gpt-35-turbo-16k",
            deployment_name="hack-model-deploy",
            api_key="5e927c96f334473194cee5f3665c7a91",
            azure_endpoint="https://hack-1206.openai.azure.com/",
            api_version="2023-07-01-preview"
        )

        self.embed_model = AzureOpenAIEmbedding(
            model="text-embedding-ada-002",
            deployment_name="hack-embed",
            api_key="5e927c96f334473194cee5f3665c7a91",
            azure_endpoint="https://hack-1206.openai.azure.com/",
            api_version="2023-07-01-preview"
        )



    def ask(self,query:str) -> str:
        # 'documents' or 'nodes'. This is how your 
        # expert data is stored
        documents = SimpleDirectoryReader("./data").load_data()

        # temp for testing
        index = VectorStoreIndex.from_documents(documents,embed_model=self.embed_model)
        query_engine = index.as_query_engine(llm=self.llm)
        response = query_engine.query(query)
        print(response)





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




