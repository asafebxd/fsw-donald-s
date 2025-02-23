"use client"

import { Prisma  } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react"; 

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../context/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";


interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload <{
        include: {
            menuCategories: {
                include: { products: true};
            }
        }
    }>;
}

type MenuCategoriesWithProductes = Prisma.MenuCategoryGetPayload<{
    include: { products: true }
}>

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = 
        useState<MenuCategoriesWithProductes>(restaurant.menuCategories[0])
    const handleCategoryClick = (category: MenuCategoriesWithProductes) => {
        setSelectedCategory(category)
    }
    const getCategoryButtonVariant = (category: MenuCategoriesWithProductes) => {
        return selectedCategory.id === category.id ? "default" : "secondary"
    }

    const {products, total, totalQuantity, toggleCart} = useContext(CartContext)

    return (  
        <div className="position-relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-5">
            <div className="p-5">
            <div className="flex items-center gap-3 ">
                <Image 
                 src={restaurant.avatarImageUrl}
                 alt={restaurant.name}
                 height={45}
                 width={45}
                />
                <div>
                    <h2 className="font-semibold text-lg">
                        {restaurant.name}
                    </h2>
                    <p className="text-xs opacity-55">
                        {restaurant.description}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                <ClockIcon size={12} />
                <p>Aberto!</p>
            </div>
    
            </div>            

            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-4 pt-8">
                    {restaurant.menuCategories.map(category => (
                        <Button onClick={() => handleCategoryClick(category)} key={category.id} variant={getCategoryButtonVariant(category)} size="sm" className="rounded-full">
                            {category.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>

            </ScrollArea>

             <h3 className="px-5 font-semibold mt-2">{selectedCategory.name}</h3>       
            <Products products={selectedCategory.products} />
            {products.length > 0 && (
                <div className="fiex-bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Total dos pedidos
                        </p>
                        <p className="text-sm font-semibold">
                            {formatCurrency(total)}
                            <span className="text-xs font-normal text-muted-foreground">/ {totalQuantity} {totalQuantity > 1 ? 'items' : "item"} </span>
                        </p>    
                    </div>
                    <Button onClick={toggleCart}>Ver Sacola</Button>
                    <CartSheet />
                </div>
            )}
        </div>
    );
}
 
export default RestaurantCategories;