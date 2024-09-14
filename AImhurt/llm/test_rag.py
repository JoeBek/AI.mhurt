import rag


def main():
    
    # create model

    model = rag.Model()

    whisper = rag.Whisper()

    prompt1 = "I need help I can't breathe"
    prompt2 = ""

    # print(model.ask(prompt1))

    print(model.ask(whisper.translate("audio_test1.wav")))
    

    

if __name__ == "__main__":
    main()
