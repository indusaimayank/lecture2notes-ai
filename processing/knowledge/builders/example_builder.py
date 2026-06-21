class ExampleBuilder:

    def build(
        self,
        examples: list
    ):

        return [

            {
                "example": example
            }

            for example in examples
        ]