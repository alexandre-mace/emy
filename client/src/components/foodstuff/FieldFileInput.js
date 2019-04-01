import React, {Component} from 'react'

export default class FieldFileInput  extends Component{
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange = e => {
        console.log(e.target);
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
    }

    render(){
        const { input: { value } } = this.props
        const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
        return(
            <div>
                <label for="input-file" class="label-file">{label}</label>
                <input
                    id="input-file"
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={this.onChange}
                />
                <span id="uploaded-file-name"></span>
            </div>
        )
    }
}