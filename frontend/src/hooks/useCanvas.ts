import { useEffect, useRef } from "react";

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

const useCanvas = (speedRnd: number, circleColor: string) => {
    // Здесь канвас, который мы берм вне хука
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Инициализация шариков
    const balls: Ball[] = [];

    // Создание 10 шариков и пуш в balls
    for (let i = 0; i < 10; i++) {
        const randomAngle = Math.random() * Math.PI * 2; // Случайный угол
        const speed = Math.random() * speedRnd; // Случайная скорость
        const ball: Ball = {
            // Рандомное появление шариков
            x: Math.random() * 500,
            y: Math.random() * 500,
            // Рандомныя скорость от 0 до взятой из инпута
            vx: Math.cos(randomAngle) * speed,
            vy: Math.sin(randomAngle) * speed,
            // Рандомный размер  шариков
            radius: Math.random() * 20 + 20,
        };
        balls.push(ball);
    }

    // Функция вызывающаяся от зменения speedRnd, circleColor
    useEffect(() => {
        // инициализвация канваса
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // функция передвижения
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < balls.length; i++) {
                const ball = balls[i];

                // Обновляем позицию круга
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Отталкиваемся от границ холста
                if (ball.x + 35 > canvas.width || ball.x - 35 < 0) {
                    ball.vx *= -1; // Меняем направление по горизонтали
                }
                if (ball.y + 35 > canvas.height || ball.y - 35 < 0) {
                    ball.vy *= -1; // Меняем направление по вертикали
                }

                // Ограничиваем движение круга, чтобы он не выходил за границы холста
                ball.x = Math.min(Math.max(ball.x, 35), canvas.width - 35);
                ball.y = Math.min(Math.max(ball.y, 35), canvas.height - 35);

                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = circleColor; // Используем текущий цвет

                ctx.filter = "blur(40px)"; // Созаднее размытия
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        draw();
    }, [speedRnd, circleColor]); // Изменения скорости и цвета могут вызывать перерисовку

    return canvasRef;
};

export default useCanvas;
