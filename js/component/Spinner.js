import React, {PropTypes} from 'react';

class Spinner extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        label: PropTypes.string,
    };

    static defaultProps = {
        label: 'loading',
        show: true,
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return <span className="spinner">
            <i className="fa fa-spinner fa-spin"/>
            {' '}
            {this.props.label}
        </span>;
    }

}

export default Spinner;
