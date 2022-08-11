export interface Aggregation {
    name: string;

    property: string;
}

export interface AggregationOptions {
    aggregatePeriod: "month" | "day" | "year" | null;

    paramAggregations: Aggregation[] | null;
}

export class ResourceLogAggregationOptions implements AggregationOptions {
    aggregatePeriod: "month" | "day" | "year" | null;

    paramAggregations: Aggregation[] | null;

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

    getAggregations() {
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
}

