export const serializeBigInt = (data: any) =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
