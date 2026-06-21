class CodeBuilder:

    def build(
        self,
        code_blocks: list
    ):

        return [

            {
                "code": code
            }

            for code in code_blocks
        ]