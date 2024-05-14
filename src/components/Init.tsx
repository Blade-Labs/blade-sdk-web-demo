import {useState} from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from "primereact/floatlabel";
import { BladeService } from '../services/BladeService';
import { demoConfig } from '../demoConfig';
import { SdkEnvironment } from '@bladelabs/blade-sdk.js';

export default function Init() {
    const bladeSDK = BladeService.getInstance();
    const [output, setOutput] = useState(JSON.stringify(bladeSDK.getInfo(), null, 2));
    const [progress, setProgress] = useState(false);

    const [apiKey, setApiKey] = useState<string>(demoConfig.apiKey);
    const [network, setNetwork] = useState<string>(demoConfig.network);
    const [dAppCode, setDAppCode] = useState<string>(demoConfig.dAppCode);
    const [sdkEnvironment, setSdkEnvironment] = useState<SdkEnvironment>(demoConfig.sdkEnvironment);
    
    const networks = [
        { name: 'Testnet', value: 'Testnet' },
        { name: 'Mainnet', value: 'Mainnet' },
    ];
    const sdkEnvironments = [
        { name: 'CI', value: SdkEnvironment.CI },
        { name: 'Prod', value: SdkEnvironment.Prod },
    ];


    // let output = JSON.stringify(bladeSDK.getInfo(), null, 2);
    


    async function initBlade() {
        setProgress(true);
        try {
            setOutput(JSON.stringify(await bladeSDK.init(apiKey, network, dAppCode, '', sdkEnvironment), null, 2));
        } catch (error) {
            setOutput("Error:\n" + JSON.stringify(error, null, 2));
        }
        setProgress(false);
    }

    async function getInfo() {
        setProgress(true);
        try {
            setOutput(JSON.stringify(await bladeSDK.getInfo(), null, 2));
        } catch (error) {
            setOutput(JSON.stringify(error, null, 2));
        }
        setProgress(false);
    }
    

    return (
        <>
            <div className="formgroup-inline text-justify">
                <div className='col-12 md:col-3 py-4 md:py-2'>
                    <FloatLabel>
                        <InputText className='w-full' id="apiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                        <label htmlFor="apiKey">apiKey</label>
                    </FloatLabel>
                </div>
                <div className='col-12 md:col-3 py-4 md:py-2'>
                    <FloatLabel>
                        <Dropdown className='w-full' inputId="network" value={network} onChange={(e) => setNetwork(e.value)} options={networks} optionLabel="name" />
                        <label htmlFor="network">Select a Network</label>
                    </FloatLabel>
                </div>
                <div className='col-12 md:col-3 py-4 md:py-2'>
                    <FloatLabel>
                        <InputText className='w-full' id="dAppCode" value={dAppCode} onChange={(e) => setDAppCode(e.target.value)} />
                        <label htmlFor="dAppCode">dAppCode</label>
                    </FloatLabel>
                </div>
                
                <div className='col-12 md:col-3 py-4 md:py-2'>
                    <FloatLabel>
                        <Dropdown className='w-full' inputId="sdkEnvironment" value={sdkEnvironment} onChange={(e) => setSdkEnvironment(e.value)} options={sdkEnvironments} optionLabel="name" />
                        <label htmlFor="sdkEnvironment">Select a SdkEnvironment</label>
                    </FloatLabel>
                </div>
            </div>
            <div className='flex flex-wrap justify-content-center gap-3 my-3'>
                <Button label="init" severity="success" onClick={initBlade} />
                <Button label="getInfo" severity="info" onClick={getInfo} />
            </div>
            <Panel header="Output">
                <div className="m-0 " style={{minHeight: '100px'}}>
                    {progress ? <ProgressSpinner/> : <pre>{output}</pre>}
                </div>
            </Panel>
        </>
        
    );
}