export type Product = {
id: string | number;
slug?: string;
name: string;
price: number;
previousPrice?: number | null;
unit?: string;
emoji?: string;
description?: string;
category?: string;
categoryName?: string;
minPrice?: number;
maxPrice?: number;
averagePrice?: number;
[key: string]: unknown;
};

export type Category = {
id?: string | number;
slug?: string;
name: string;
icon?: string;
};

export type ApiResponse<T> = {
success?: boolean;
message?: string;
data: T;
};
