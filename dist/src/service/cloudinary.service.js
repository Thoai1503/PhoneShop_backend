var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
let CloudinaryService = class CloudinaryService {
    isConfigured = false;
    configureClient() {
        if (this.isConfigured) {
            return;
        }
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;
        if (!cloudName || !apiKey || !apiSecret) {
            throw new BadRequestException('Cloudinary credentials are missing in environment variables');
        }
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
            secure: true,
        });
        this.isConfigured = true;
    }
    async uploadProductContentImage(file, productId) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        if (!file.mimetype?.startsWith('image/')) {
            throw new BadRequestException('Only image files are allowed');
        }
        this.configureClient();
        const base64 = file.buffer.toString('base64');
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataUri, {
            folder: `phoneshop/products/${productId}/content`,
            resource_type: 'image',
        });
        return result.secure_url;
    }
};
CloudinaryService = __decorate([
    Injectable()
], CloudinaryService);
export { CloudinaryService };
//# sourceMappingURL=cloudinary.service.js.map