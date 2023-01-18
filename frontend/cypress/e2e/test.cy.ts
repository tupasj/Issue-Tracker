describe('test describe', () => {
  it('test it', () => {
    const loginStub = cy.stub();
    loginStub.returns('foo');
    loginStub();
    expect(loginStub).to.have.returned('foo');
    // expect(loginStub).to.have.been.calledOnce;
    // expect(loginStub).to.have.always.been.calledWithExactly(42);
  });
});
