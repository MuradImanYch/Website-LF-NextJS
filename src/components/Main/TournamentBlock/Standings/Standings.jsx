import './Standings.css';

const Standings = () => {
    return (
        <div className='standings'>
            <table>
                <thead>
                    <tr>
                        <th className="place">#</th>
                        <th className="team">Команда</th>
                        <th className='points'>О</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="place">1</td>
                        <td className="team">Испания</td>
                        <td className='points'>6</td>
                    </tr>
                    <tr>
                        <td className="place">2</td>
                        <td className="team">Италия</td>
                        <td className='points'>514</td>
                    </tr>
                    <tr>
                        <td className="place">3</td>
                        <td className="team">Теам Намбер но</td>
                        <td className='points'>5</td>
                    </tr>
                    <tr>
                        <td className="place">4</td>
                        <td className="team">Эстония</td>
                        <td className='points'>0</td>
                    </tr>
                    <tr>
                        <td className="place">4</td>
                        <td className="team">Эстония</td>
                        <td className='points'>0</td>
                    </tr>
                    <tr>
                        <td className="place">4</td>
                        <td className="team">Эстония</td>
                        <td className='points'>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Standings;