class ConceptBuilder:

    def build(
        self,
        concepts: list
    ):

        return [

            {
                "concept": concept
            }

            for concept in concepts
        ]