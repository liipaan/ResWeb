export interface Food {
_id: string;
name: string;
description: string;
price: number;
imageUrl: string;
category: string | { _id: string; name: string };
available: boolean;
}

export interface CartItem {
food: Food;
quantity: number;
}

export interface AuthUser {
id: string;
name: string;
email: string;
role: "customer" | "admin";
}