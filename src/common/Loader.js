import React, { PureComponent } from 'react';
import ReactLoading from 'react-loading';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';

class Loading extends PureComponent {
    render() {
        const { message, isLoad } = this.props.loading;
        console.log(`Loading: ${isLoad}`);
        return (
            <div className="wrapper" >
                {
                    isLoad && <Modal zIndex={1000000} isOpen={true}>
                        <center >
                            <ReactLoading type='cylon' color='#000000' delay={0} />
                            <p className="loader-text loadingText">{message ? message : 'Loading...'}</p>
                        </center>
                    </Modal>
                }
            </div>
        );
    }
}
export default connect((state) => {
    return {
        loading: state.loading,
    }
})(Loading);