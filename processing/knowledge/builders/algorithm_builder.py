class AlgorithmBuilder:

    def build(
        self,
        algorithms: list
    ):

        return [

            {
                "algorithm": algorithm
            }

            for algorithm in algorithms
        ]