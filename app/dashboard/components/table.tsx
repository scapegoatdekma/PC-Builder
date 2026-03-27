"use client";
import { Component, ComponentCategory } from "@/lib/types";
import {
    Box,
    Cpu,
    Fan,
    HardDrive,
    MemoryStick,
    Monitor,
    Plus,
    Server,
    Zap,
} from "lucide-react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddComponentDialogContent } from "./add-component-dialog";

const iconMap: Record<
    ComponentCategory["icon"],
    React.ComponentType<{ className?: string }>
> = {
    Cpu,
    Monitor,
    Server,
    MemoryStick,
    HardDrive,
    Zap,
    Box,
    Fan,
};
type Props = {
    components: ComponentCategory[];
    selectedByCategory: Record<string, Component | null>;
    onSelectedComponent: (
        categoryId: string,
        component: Component | null,
    ) => void;
};
export function TableParts({
    components,
    selectedByCategory,
    onSelectedComponent,
}: Props) {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

    const totalPrice = Object.values(selectedByCategory).reduce(
        (sum, c) => sum + (c?.price ?? 0),
        0,
    );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Компонент</TableHead>
                    <TableHead className="">Тип</TableHead>
                    <TableHead className="">Модель</TableHead>
                    <TableHead className="">Цена</TableHead>
                    <TableHead className="text-right">Действие</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {components.map((category) => {
                    const Icon = iconMap[category.icon];
                    const selected = selectedByCategory[category.id];

                    return (
                        <TableRow key={category.id} className="my-2">
                            <TableCell>
                                <div className="flex items-center">
                                    <Icon className="h-5 w-5 mr-1" />
                                </div>
                            </TableCell>
                            <TableCell className="font-bold">
                                {category.name}
                            </TableCell>
                            <TableCell>{selected?.name ?? "-"}</TableCell>
                            <TableCell>{selected?.price ?? "-"}</TableCell>
                            <TableCell className="text-right">
                                <Dialog
                                    open={openCategoryId === category.id}
                                    onOpenChange={(open) =>
                                        setOpenCategoryId(
                                            open ? category.id : null,
                                        )
                                    }>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Plus className="h-4 w-4 mr-1" />
                                            {selected ? "Изменить" : "Добавить"}
                                        </Button>
                                    </DialogTrigger>
                                    <AddComponentDialogContent
                                        categoryId={category.id}
                                        categoryName={category.name}
                                        onSelect={(component) => {
                                            onSelectedComponent(
                                                category.id,
                                                component,
                                            );
                                            setOpenCategoryId(null);
                                        }}
                                    />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>
                        <p className="font-medium">Цена сборки: </p>
                        <p className="font-large text-gray-500">
                            {new Intl.NumberFormat("ru-Ru").format(totalPrice)}
                        </p>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
