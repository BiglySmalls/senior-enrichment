import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, removeCampus } from '../reducers';
import AddCampus from './AddCampus';

class CampusList extends Component {

    render() {
        const { campuses } = this.props;

        return (
            <div>
                <h3>Campuses</h3>
                <div className="row">
                    {
                        campuses.map(campus => (
                            <div className="col-xs-4" key={campus.id}>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.props.OnDelete(campus.id)}>Delete</button>
                                <Link className="thumbnail" to={`/campuses/${campus.id}`}>
                                    <img src={campus.image} />
                                    <div className="caption">
                                        <h5>
                                            <span>{campus.name}</span>
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <AddCampus />
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        OnDelete: id => {
            dispatch(removeCampus(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);