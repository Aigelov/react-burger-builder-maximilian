import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            closeModal={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  }
};

export default WithErrorHandler;
