"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../users/user.repository");
const user_errors_1 = require("../users/user.errors");
const auth_errors_1 = require("./auth.errors");
let AuthService = class AuthService {
    constructor(userRepository, configService, jwtService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async signup(input) {
        const { email } = input;
        const userWithEmail = await this.userRepository.findByEmail(email);
        if (userWithEmail) {
            throw new user_errors_1.UserAlreadyExistsError({ email });
        }
        const user = await this.userRepository.createAndSave(input);
        return this.getAuthPayload(user);
    }
    async login(input) {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new auth_errors_1.AuthWrongCredentialsError();
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(input.password, user.passwordHash);
        if (!isPasswordCorrect) {
            throw new auth_errors_1.AuthWrongCredentialsError();
        }
        return this.getAuthPayload(user);
    }
    getAuthPayload(user) {
        const accessToken = this.jwtService.sign({ id: user.id, email: user.email }, this.configService.get('app.jwtAuth', { infer: true }));
        return {
            accessToken,
            profile: user
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map