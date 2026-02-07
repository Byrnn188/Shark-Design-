import { terser } from 'rollup-plugin-terser'
import replce from '@rollup/plugin-replace'
import basicConfig from './rollup.config'

const config = {
    ...basicConfig,
    output: [
        {
            name: 'Vikingship',
            file: 'dist/index.umd.js',
            format: 'umd',
            exports: 'named', //全局变量命名的方式导出
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
                'axios': 'Axios'
            },
            plugins: [
                terser()
            ],
        }
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        ...basicConfig.plugins
    ],
    external: ['react', 'react-dom', 'axios']
}

export default config