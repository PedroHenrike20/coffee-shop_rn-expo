import { getDefaultConfig } from '@expo/metro-config';
import type { MetroConfig } from '@expo/metro-config';


const defaultConfig = getDefaultConfig(__dirname) as MetroConfig;

const resolver = {
    ...defaultConfig.resolver,
    sourceExts: [
        ...(defaultConfig.resolver.sourceExts || []),
        'cjs'
    ]
}

const newConfig: MetroConfig = {
    ...defaultConfig,
    resolver,
}

export default newConfig;

