import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname + './src'),
            '@Components': path.resolve(__dirname + './src/Components'),
            '@Utils': path.resolve(__dirname + './src/Utils'),
            '@Hooks': path.resolve(__dirname + './src/Hooks'),
            '@Services': path.resolve(__dirname + './src/Services'),
            '@Store': path.resolve(__dirname + './src/Store'),
            '@Routes': path.resolve(__dirname + './src/Routes'),
            '@Layout': path.resolve(__dirname + './src/Layout'),
        },
    },
});
