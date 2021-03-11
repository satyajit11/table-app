import React, { Component } from 'react';
import './styles/table.scss';
import downloadIcon from './icon/f33d.png';
export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceId: '',
            invoiceAmount: '',
            billingPeriod: '',
            creditsUsed: '',
            paymentStatus: ''
        }
        
    }
    render(){
        const {data, sortDataHandle,show,showModal,hideModal} = this.props;
        const showHideClassName = show ? "modal display-block" : "modal display-none";
        return(
            <div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{cursor: 'pointer'}} onClick={() => sortDataHandle()}>ID</th>
                        <th >Amount</th>
                        <th>Time Period</th>
                        <th>Credits Used</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((singleData) => (
                       
                            <tr style={{cursor: 'pointer'}} key={singleData.InvoiceID} onClick={() => {
                                showModal();
                                this.setState({
                                    invoiceId: singleData.InvoiceID,
                                    invoiceAmount: singleData.InvoiceAmount,
                                    billingPeriod: singleData.BillingPeriod,
                                    creditsUsed: singleData.CreditsUsed,
                                    paymentStatus: singleData.InvoicePaymentStatus
                                })
                            }}>
                                <td>{singleData.InvoiceID}</td>
                                <td>{singleData.InvoiceAmount}</td>
                                <td>{singleData.BillingPeriod}</td>
                                <td>
                                    <div className="progress-wrapper">
                                    <div className="progress-bar">
                                        <div className="progress" style={{width: (singleData.CreditsUsed)/(singleData.CreditsLimit)*100 + '%'}}></div>
                                    </div>
                                    {singleData.CreditsUsed}/{singleData.CreditsLimit}
                                    </div>
                                </td>
                                <td><span className="badge">{singleData.InvoicePaymentStatus}</span></td>
                                <td>
                                    <button className="receipt-btn">
                                        <img src={downloadIcon} className="icon" alt="download"/>
                                        Receipt
                                    </button>
                                    
                                </td>
                                
                            </tr>
                            
                        
                        
                    ))}
                    <div className={showHideClassName}>
                        <section className="modal-main">
                            <div className="modal-header">
                                <h4>{this.state.invoiceId}</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-control">
                                    <label>ID</label>
                                    <input type="text" value={this.state.invoiceId} disabled/>
                                </div>
                                <div className="form-control">
                                    <label>Amount</label>
                                    <input type="text" value={this.state.invoiceAmount} disabled/>
                                </div>
                                <div className="form-control">
                                    <label>Date</label>
                                    <input type="text" value={this.state.billingPeriod} disabled/>
                                </div>
                                <div className="form-control">
                                    <label>Credits Used</label>
                                    <input type="text" value={this.state.creditsUsed} disabled/>
                                </div>
                                <div style={{display: 'flex',flexDirection: 'row'}}>
                                    <div className="form-control" style={{marginRight: '30px'}}>
                                        <input type="radio" id="paid" name="paid" value="" checked={this.state.paymentStatus === "Paid" ? 'checked' : null} />
                                        <label>Paid</label>
                                    </div>
                                    <div className="form-control">
                                        <input type="radio" id="paid1" name="paid1" value="" checked={this.state.paymentStatus === "Unpaid" ? 'checked' : null} />
                                        <label>Not Paid</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="close-btn" onClick={(e) => {e.stopPropagation(); hideModal()}}>
                                    Close
                                </button>
                                <button type="button" className="update-btn" onClick={(e) => {e.stopPropagation(); hideModal()}}>
                                    Update Details
                                </button>
                            </div>
                        </section>
                    </div>
                </tbody>
            </table>
            
        </div>
        )
    }
}

