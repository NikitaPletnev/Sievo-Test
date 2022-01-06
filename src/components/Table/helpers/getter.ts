export const getData = () => {
    return fetch('https://sievo-react-assignment.azurewebsites.net/api/data')
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
