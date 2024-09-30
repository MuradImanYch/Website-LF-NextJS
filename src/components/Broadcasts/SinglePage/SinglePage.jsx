import Image from 'next/image';
import './SinglePage.css';
import Client from '../Client/Client';

const SinglePage = async ({id}) => {
    async function fetchBroadcast() {
        try {
          const res = await fetch(`http://78.46.254.73:3000/api/broadcasts?id=${id}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }
    
    const broadcast = await fetchBroadcast();

    return (
        <div className="single-page">
            <h1>Трансляция матча: <Image title={broadcast[0].hName} alt={`${broadcast[0].hName} лого`} placeholder="empty" src={broadcast[0].hLogo} width={25} height={25} /> {broadcast[0].hName} - {broadcast[0].aName} <Image title={broadcast[0].aName} alt={`${broadcast[0].aName} лого`} placeholder="empty" src={broadcast[0].aLogo} width={25} height={25} /> | {broadcast[0].lName} <span>{broadcast[0].broadcastLink === null || broadcast[0].broadcastLink === '' ? <span style={{ color: 'silver', letterSpacing: '1.3px', margin: '0 0 0 20px' }}>[Трансляция пока не началась]</span> : <span style={{ color: 'red', letterSpacing: '1.3px', margin: '0 0 0 20px' }}>[LIVE]</span>}</span></h1>

            <Client broadcast={broadcast} />
        </div>
    );
};

export default SinglePage;