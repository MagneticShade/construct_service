import { useState, useEffect } from "react";

interface DraggableBlockOptions {
    initialPosition: { x: number; y: number };
    dropZoneId: string;
    onDragEnd?: () => void;
}

const useDraggableBlock = ({
    initialPosition,
    dropZoneId,
    onDragEnd,
}: DraggableBlockOptions) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(initialPosition);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isInDropZone, setIsInDropZone] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                const clientX =
                    "touches" in e ? e.touches[0].clientX : e.clientX;
                const clientY =
                    "touches" in e ? e.touches[0].clientY : e.clientY;
                const newX = clientX - offset.x;
                const newY = clientY - offset.y;
                setPosition({ x: newX, y: newY });
                checkDropZone(clientX, clientY);
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
            if (onDragEnd) {
                onDragEnd();
              }
            if (!isInDropZone) {
                // Возвращаем блок в начальное положение
                setPosition(initialPosition);
            }
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("touchmove", handleMove, {
                passive: false,
            });
            window.addEventListener("mouseup", handleEnd);
            window.addEventListener("touchend", handleEnd, { passive: false });
        } else {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, isInDropZone, offset, initialPosition]);

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        setOffset({
            x: clientX,
            y: clientY,
        });
    };

    const checkDropZone = (clientX: number, clientY: number) => {
        const dropZone = document.getElementById(dropZoneId);
        if (!dropZone) return;
        const dropZoneRect = dropZone.getBoundingClientRect();
        const isInZone =
            clientX >= dropZoneRect.left &&
            clientX <= dropZoneRect.right &&
            clientY >= dropZoneRect.top &&
            clientY <= dropZoneRect.bottom;
        setIsInDropZone(isInZone);
    };

    return {
        position,
        isDragging,
        handleStart,
    };
};

export default useDraggableBlock;
