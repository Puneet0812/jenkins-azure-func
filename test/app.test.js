const app = require('../app'); // Adjusted to match our actual app.js file

describe('Azure Function Tests', () => {
    it('should return Hello, World!', async () => {
        const context = { res: {} };
        await app(context, {});
        expect(context.res.status).toBe(200);
        expect(context.res.body).toBe("Hello, World!");
    });

    it('should return 200 status code', async () => {
        const context = { res: {} };
        await app(context, {});
        expect(context.res.status).toBe(200);
    });

    it('should return non-empty body', async () => {
        const context = { res: {} };
        await app(context, {});
        expect(context.res.body).not.toBe("");
    });
});
