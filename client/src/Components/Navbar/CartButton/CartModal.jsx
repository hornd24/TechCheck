import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import logo from '../../../ic_shopping_cart_black_24px.svg';

const style = {
    textAlign: 'center',
    marginTop: '20px',
  }

class CartModal extends Component {
    state = {
        showCartModalDialogue: false,
        open: false
    }

    // buttonClickedhandler = () => {
    //     this.setState({
    //         showSignInDialogue: true,
    //     });
    // };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    static muiName = 'FlatButton';

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Order"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

      /*  const items = this.props.cartarray.map((step) => { 
            return (
               <li> Item: {step.title}......Price: {step.author}.....<button className="delete" onClick={() => this.props.onClick(step)}>
              Remove
             </button> </li> 
            );
    
    }); */
        return (
            <div>
                <div>
                    <FlatButton {...this.props} title='cart' style={style}  onClick={this.handleOpen} > 
                    <img src={logo} alt="shopping cart" /> 
                    </FlatButton>
                </div>
                <div>
                    <Dialog
                        title="Cart Items"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <br />
                        <br />

                           Item Count :   {this.props.cartitem}
                       
                        <br />
                        <br />
                           Item Total Amount :  {this.props.cartamount}
                       
                        <br />
                    </Dialog>
                </div>
            </div>

        );
    }
}

export default CartModal;