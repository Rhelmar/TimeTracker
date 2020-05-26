import axios from 'axios';

const url = 'http://localhost:5000/api/trackers';

class APIService {
    static getTrackers() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(tracker => ({
                        ...tracker
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

    static insertTracker(tracker) {
        return axios.post(url, {
            tracker
        })
    }

    static updateTracker(tracker) {
        return axios.patch(`${url}/${tracker.id}`, {
            tracker
        })
    }
}

export default APIService;