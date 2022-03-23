import React from 'react';

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }

    }
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    onClickHandler = () => {
        const data = new FormData()
        data.append('file', 'something');
        console.log('-----------------', data)
        // fetch('http://localhost:5000/news', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => {
        //         console.log('res---------', res)
        //     })
        //     .catch(error => {
        //         console.log('Please check your connection');
        //     })
    }
    render() {
        return (
            <>
                <input type="file" name="file" onChange={this.onChangeHandler} />
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            </>
        )
    }
}