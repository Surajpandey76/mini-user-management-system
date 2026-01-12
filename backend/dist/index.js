"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get("/", (_req, res) => {
    res.send("API is running");
});
exports.app.use("/auth", auth_routes_1.default);
exports.app.use("/users", user_routes_1.default);
exports.app.use("/admin", admin_routes_1.default);
const PORT = process.env.PORT || 5000;
if (require.main === module) {
    exports.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
