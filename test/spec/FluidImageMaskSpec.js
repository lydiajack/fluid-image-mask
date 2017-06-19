describe('FluidImageMask', function() {
	var targetEl,
	    fim;

  beforeEach(function() {
  	targetEl = document.createElement('div');
    fim = new FluidImageMask({
      'targetEl': targetEl
    });
  });

  it('should be able to identify a target', function() {
  	fim.create();
    expect(fim.targetEl).toBeTruthy();
  });
});