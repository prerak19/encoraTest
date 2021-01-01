import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { getNotes, addNotes, editNotes, deleteNotes } from '../Redux/action';
import { connect } from 'react-redux';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorTitle: null,
      errorBody: null,
      form: {
        id: null,
        title: "",
        body: "",
      },
      isEdit: false,
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(name, value) {
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  clearData() {
    this.setState({
      form: {
        id: null,
        title: "",
        body: "",
      },
      errorTitle: null,
      errorBody: null,
      isEdit: false,
    });
  }

  addUpdateNotes = async (value = '') => {
    const { form, isEdit } = this.state;
    const { title, body, id } = form;
    if (isEdit && value === 'Add') {
      this.clearData();
      return;
    }
    if (title === '') {
      this.setState({ errorTitle: 'Please Enter Title.' });
      return;
    }
    else if (body === '') {
      this.setState({ errorBody: 'Please Enter Body.' });
      return;
    }
    const obj = {
      id: isEdit ? id : Math.floor(Math.random() * (999 - 100 + 1) + 100),
      title,
      body
    };
    let res = {};
    if (isEdit) {
      res = await this.props.editNotes(obj);
    } else {
      res = await this.props.addNotes(obj);
    }
    if (res && res.rc === 0) {
      this.clearData();
    }
  }
  deleteNotes = async (e, data) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      await this.props.deleteNotes(data.id);
      this.clearData();
    }
  }
  updateDetails = (e, data) => {
    e.preventDefault();
    this.clearData();
    let formObj = {
      ...this.state.form,
      title: data.title,
      body: data.body,
      id: data.id,
    }
    this.setState({
      form: formObj,
      isEdit: true
    })
  }

  render() {
    const { form, errorBody, isEdit, errorTitle } = this.state;
    const { title, body } = form;
    const { notes } = this.props;
    return (
      <div className="mt-5 mb-5 notesContainer">
        <h2 className="heading mb-0">G Notes</h2>
        <Row>
          <Col xs={4} className="leftBlock pr-0">
            {notes && notes.length > 0 && notes.map((x, i) => {
              return <div key={i} className="leftBlockDetail pt-2" onClick={(e) => this.updateDetails(e, x)}>
                <Row>
                  <Col xs={9} className="leftTitle px-4">{x.title}</Col>
                  <Col xs={3}><i className="fa fa-lg fa-close float-right mr-3 mt-2" onClick={(e) => this.deleteNotes(e, x)}></i></Col>
                </Row>
                <Row className="leftBody px-4 mb-2">{x.body}</Row>
              </div>
            })}

          </Col>
          <Col xs={8} className="w-100 pr-5 pl-4">
            <Row>
              <Col xs={12}>
                <Button
                  className="px-4 addBtn float-right mt-2"
                  onClick={() => this.addUpdateNotes('Add')}
                ><i className="fa fa-plus mr-2"></i>Add Note</Button>
              </Col>
            </Row>
            <div>
              <FormGroup>
                <Label for="title" className="font-weight-bold">Title:</Label>
                <Input name="title" placeholder="Title of Notes"
                  value={title}
                  onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
                {errorTitle && <Label className="error mb-0">{errorTitle}</Label>}
              </FormGroup>
              <FormGroup>
                <Label for="body" className="font-weight-bold">Body:</Label>
                <Input type="textarea" name="body" rows={13}
                  value={body}
                  onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
                  placeholder="Enter Discription" />
                {errorBody && <Label className="error mb-0">{errorBody}</Label>}
              </FormGroup>
              <Button
                color="primary"
                className="px-4 float-right mt-2 mb-3"
                onClick={() => this.addUpdateNotes()}
                disabled={!isEdit}
              >Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(mapStateToProps, { getNotes, addNotes, editNotes, deleteNotes })(Notes); 