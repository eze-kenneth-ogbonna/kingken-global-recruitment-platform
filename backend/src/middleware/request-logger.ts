import type { NextFunction, Request, Response } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const startedAt = Date.now();

    res.on("finish", () => {
        const durationMs = Date.now() - startedAt;
        const status = res.statusCode;
        const level = status >= 500 ? "ERROR" : status >= 400 ? "WARN" : "INFO";

        console.log(
            JSON.stringify({
                level,
                method: req.method,
                path: req.originalUrl,
                status,
                duration_ms: durationMs,
            })
        );
    });

    next();
}