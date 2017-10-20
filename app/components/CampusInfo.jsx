import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { putCampus, fetchCampuses, fetchStudents } from '../reducers';

class CampusInfo extends Component {
    constructor(props) {
        super(props);

        const campusId = +props.match.params.campusId
        const campuses = props.campuses;
        const campus = campuses && campuses.find(campus => campus.id === campusId);

        this.state = {
            disabled: true,
            campusName: campus && campus.name,
            campusImgUrl: campus && campus.image,
            campus: campus && campus
        }
        this.enableInputs = this.enableInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.campuses) {

            const campusId = +this.props.match.params.campusId
            const campus = nextProps.campuses.find(campus => campus.id === campusId);
            const { name, image } = campus;
            this.setState({
                campus,
                campusName: name,
                campusImgUrl: image,
            })
        }
    }

    enableInputs(evt) {
        evt.preventDefault();
        this.setState({ disabled: false })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const campusId = this.state.campus.id;
        const campus = {
            name: this.state.campusName,
            email: this.state.campusImgUrl
        }

        this.props.dispatchCampus(campusId, campus);
        this.setState({
            disabled: true
        });
    }

    handleNameChange(evt) {
        this.setState({ campusName: evt.target.value });
    }

    handleUrlChange(evt) {
        this.setState({ campusUrl: evt.target.value });
    }

    render() {
        const campus = this.state.campus

        return (
            !campus ? <h2>No Campus Found</h2> :
                <form className="inputs" onSubmit={this.handleSubmit}>
                    <label>Campus Information</label>
                    <div className="input-group">

                        {/* INPUT FIELDS TO EDIT CAMPUS INFO; LOADS DEFAULT INFO AFTER REFRESH */}

                        <input
                            disabled={this.state.disabled}
                            value={this.state.campusName}
                            type="text"
                            name="campusName"
                            onChange={this.handleNameChange} />

                        <input
                            disabled={this.state.disabled}
                            value={this.state.campusImgUrl || ''}
                            name="campusImgUrl"
                            onChange={this.handleUrlChange} />

                        {/* BUTTONS TO ENABLE INPUT FIELDS AND SUBMIT EDITTED CAMPUS INFO */}

                        <button className="btn btn-warning" onClick={this.enableInputs}>Edit</button>
                        <button className="btn btn-success">Submit</button>
                    </div>
                </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    if (!state.campuses.length) return {
        campuses: []

    }

    const { campusId } = ownProps
    return {
        campuses: state.campuses,
        campusId
    }
};

const mapDispatchToProps = (dispatch) => ({
    dispatchCampus: (campusId, campus) => dispatch(putCampus(campusId, campus))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusInfo));