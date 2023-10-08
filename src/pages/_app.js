import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import 'antd-tag-input/dist/style.css';

export default function App({Component, pageProps}) {
    return <>
        <NextNProgress options={{showSpinner: false}}/>
        <Component {...pageProps} />
    </>

}
