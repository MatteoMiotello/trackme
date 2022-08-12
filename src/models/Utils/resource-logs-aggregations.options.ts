export interface Aggregation {
    name: string;

    property: string;
}

export interface AggregationOptions {
    aggregatePeriod: "month" | "day" | "year" | null;

    paramAggregations: Aggregation[] | null;

    aggregateFrom: Date | null;

    aggregateTo: Date | null;
}

export class ResourceLogAggregationHelper implements AggregationOptions {
    aggregatePeriod: "month" | "day" | "year" | null;

    paramAggregations: Aggregation[] | null;

    aggregateFrom: Date | null;

    aggregateTo: Date | null;

    getDateAggregation() {
        switch (this.aggregatePeriod) {
            case "day":
                return {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdDate"
                    }
                };
            case "month":
                return {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$createdDate"
                    }
                };
            case "year":
                return {
                    $dateToString: {
                        format: "%Y",
                        date: "$createdDate"
                    }
                };
            default:
                return {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdDate"
                    }
                };
        }

    }

    getGroupsBy() {
        let aggregations = {
            date: this.getDateAggregation()
        };

        if (this.paramAggregations) {
            aggregations = {
                ...aggregations,
                ...this.paramAggregations.reduce((obj, item: Aggregation) => {
                    return {
                        ...obj,
                        [item.name]: `$${item.property}`
                    };
                }, {})
            };
        }

        return aggregations;
    }

    getAggregateFromTo(){
        let aggregations = [];

        if (this.aggregateFrom) {
            aggregations = [
                ...aggregations,
                { createdDate: { $gte: this.aggregateFrom } }
            ];
        }

        if ( this.aggregateTo ) {
            aggregations = [
                ...aggregations,
                { createdDate: { $lte: this.aggregateTo } }
            ];
        }

        return aggregations;
    }
}

