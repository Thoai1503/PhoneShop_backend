export declare class CloudinaryService {
    private isConfigured;
    private configureClient;
    uploadProductContentImage(file: Express.Multer.File, productId: number): Promise<string>;
}
