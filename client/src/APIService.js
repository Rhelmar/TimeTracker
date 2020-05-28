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

    static async addTracker(tracker) {
        return await axios.post(url, {
            tracker
        })
    }

    static async updateTracker(tracker) {
        return await axios.patch(`${url}/${tracker.id}`, {
            tracker
        })
    }

    static async deleteTracker(id) {
        return await axios.delete(`${url}/${id}`)
    }
}

export default APIService;