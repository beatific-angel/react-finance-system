import React from 'react';
import { Upload, Icon, message } from 'antd';


export default class Avatar extends React.Component {
  state = {
    imageUrl: !!this.props.defaultV ? this.props.defaultV : undefined,
    loading: false,
  };

  componentDidUpdate = (P_props) => {
    if(P_props.defaultV !== this.props.defaultV){
      this.setState({imageUrl: this.props.defaultV})
    }
  };
  

  beforeUpload = (file) => {

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/ico';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/ICO file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  getBase64 = (img, callback) => {

    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    this.props.handleImage(info.file.originFileObj);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    //console.log('this.props.def', this.props.defaultV);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        type='file'
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}