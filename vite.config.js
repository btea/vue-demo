import importElementPlus from 'vite-plugin-element-plus'
import vuePlugin from '@vitejs/plugin-vue'

export default {
    server: {
        host: true
    },
    plugins: [vuePlugin(), importElementPlus()]
}
