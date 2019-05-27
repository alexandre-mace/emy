import React, {Component} from 'react'
import './FieldFileInput.scss';

export default class FieldFileInput  extends Component{
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange = e => {
        document.getElementById("label-file").textContent = e.target.files[0].name;
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
    }

    render(){
        // const { input: { value } } = this.props
        const {input,label, required } = this.props  //whatever props you send to the component from redux-form Field
        return(
            <div className="custom-file-input">
                <label id="label-file" htmlFor={this.props.id} className="label-file w-100 text-center">{label}</label>
                <input
                    className="input-file"
                    id={this.props.id}
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={this.onChange}
                    required={required}
                />
                <span id="uploaded-file-name"></span>
            </div>
        )
    }
}