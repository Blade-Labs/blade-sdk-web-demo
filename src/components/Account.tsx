import {useState} from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { BladeService } from '../services/BladeService';

export default function Acccount() {
    const bladeSDK = BladeService.getInstance();
    const [output, setOutput] = useState(JSON.stringify(bladeSDK.getInfo(), null, 2));
    const [progress, setProgress] = useState(false);

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
            <pre>
                createAccount
                getAccountInfo
                deleteAccount
                getNodeList
                stakeToNode

                getKeysFromMnemonic
                searchAccounts
            </pre>

            <div className='flex flex-wrap justify-content-center gap-3 my-3'>
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