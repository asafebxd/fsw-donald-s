"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantsHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}
const RestaurantsHeader = ({restaurant}: RestaurantsHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back()
    return ( <div className="realtive h-[250px] w-full">
        <Button variant="secondary" size="icon" className="absolute left-4 top-4 z-50 rounded-full">
            <ChevronLeftIcon />
        </Button>

        <Image 
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            className="oject-cover"
            onClick={handleBackClick}
        />

        <Button variant="secondary" size="icon" className="absolute right-4 top-4 z-50 rounded-full">
            <ScrollTextIcon />
        </Button>
        </div> );
}
 
export default RestaurantsHeader;