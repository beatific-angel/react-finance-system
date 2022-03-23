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
