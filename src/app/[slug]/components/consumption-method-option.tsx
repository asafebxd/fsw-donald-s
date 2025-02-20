import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


interface ConsumptionMethodOptionProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
    option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({imageAlt, imageUrl, buttonText, option, slug} : ConsumptionMethodOptionProps) => {
    return ( <Card>
        <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="realtive h-[80px] w-[80px]">
            <Image 
                src={imageUrl}
                width={78}
                height={80}
                alt={imageAlt}
                className="object-contain"
            />
            </div>
            <Button variant={"secondary"} className="rounded-full" asChild>
                <Link href={`/${slug}/menu?ConsumptionMethod=${option}`}>{buttonText}</Link>
            </Button>
        </CardContent>
    </Card> );
}
 
export default ConsumptionMethodOption;