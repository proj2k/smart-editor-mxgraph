/*
 * Copyright (c) 2006-2013, JGraph Ltd
 *
 * Defines the startup sequence of the application.
 */
{

	/**
	 * Constructs a new application (returns an mxEditor instance)
	 */
	function mxApplication(config)
	{
		var editor = null;
		
		var hideSplash = function()
		{
			// Fades-out the splash screen
			var splash = document.getElementById('splash');
			
			if (splash != null)
			{
				try
				{
					mxEvent.release(splash);
					mxEffects.fadeOut(splash, 100, true);
				}
				catch (e)
				{
					splash.parentNode.removeChild(splash);
				}
			}
		};
		
		try
		{
			if (!mxClient.isBrowserSupported())
			{
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				mxObjectCodec.allowEval = true;
				var node = mxUtils.load(config).getDocumentElement();
				editor = new mxEditor(node);
				mxObjectCodec.allowEval = false;
				
				// Adds active border for panning inside the container
				editor.graph.createPanningManager = function()
				{
					var pm = new mxPanningManager(this);
					pm.border = 30;
					
					return pm;
				};
				
				editor.graph.allowAutoPanning = true;
				editor.graph.timerAutoScroll = true;
				
				// Updates the window title after opening new files
				var title = document.title;
				var funct = function(sender)
				{
					document.title = title + ' - ' + sender.getTitle();
					//var doc = mxUtils.parseXML('&lt;mxGraphModel&gt;&lt;root&gt;&lt;mxCell id="0"/&gt;&lt;mxCell id="1" parent="0"/&gt;&lt;mxCell id="2" vertex="1" parent="1" value="Interval 1"&gt;&lt;mxGeometry x="380" y="20" width="140" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="3" vertex="1" parent="1" value="Interval 2"&gt;&lt;mxGeometry x="200" y="80" width="380" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="4" vertex="1" parent="1" value="Interval 3"&gt;&lt;mxGeometry x="40" y="140" width="260" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="5" vertex="1" parent="1" value="Interval 4"&gt;&lt;mxGeometry x="120" y="200" width="240" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="6" vertex="1" parent="1" value="Interval 5"&gt;&lt;mxGeometry x="420" y="260" width="80" height="30" as="geometry"/&gt;&lt;/mxCell&gt;&lt;mxCell id="7" edge="1" source="2" target="3" parent="1" value="Transfer1"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="420" y="60"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="8" edge="1" source="2" target="6" parent="1" value="Transfer2"&gt;&lt;mxGeometry as="geometry" relative="1" y="0"&gt;&lt;Array as="points"&gt;&lt;Object x="600" y="60"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="9" edge="1" source="3" target="4" parent="1" value="Transfer3"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="260" y="120"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="10" edge="1" source="4" target="5" parent="1" value="Transfer4"&gt;&lt;mxGeometry as="geometry"&gt;&lt;Array as="points"&gt;&lt;Object x="200" y="180"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id="11" edge="1" source="4" target="6" parent="1" value="Transfer5"&gt;&lt;mxGeometry as="geometry" relative="1" y="-10"&gt;&lt;Array as="points"&gt;&lt;Object x="460" y="155"/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;');
					console.log(sender);
					// var doc = mxUtils.parseXML('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" vertex="1" parent="1" value="Interval 1"><mxGeometry x="380" y="0" width="140" height="30" as="geometry"/></mxCell><mxCell id="3" vertex="1" parent="1" value="Interval 2"><mxGeometry x="200" y="80" width="380" height="30" as="geometry"/></mxCell><mxCell id="4" vertex="1" parent="1" value="Interval 3"><mxGeometry x="40" y="140" width="260" height="30" as="geometry"/></mxCell><mxCell id="5" vertex="1" parent="1" value="Interval 4"><mxGeometry x="120" y="200" width="240" height="30" as="geometry"/></mxCell><mxCell id="6" vertex="1" parent="1" value="Interval 5"><mxGeometry x="420" y="260" width="80" height="30" as="geometry"/></mxCell><mxCell id="7" edge="1" source="2" target="3" parent="1" value="Transfer1"><mxGeometry as="geometry"><Array as="points"><Object x="420" y="60"/></Array></mxGeometry></mxCell><mxCell id="8" edge="1" source="2" target="6" parent="1" value=""><mxGeometry as="geometry" relative="1" y="-30"><Array as="points"><Object x="600" y="60"/></Array></mxGeometry></mxCell><mxCell id="9" edge="1" source="3" target="4" parent="1" value="Transfer3"><mxGeometry as="geometry"><Array as="points"><Object x="260" y="120"/></Array></mxGeometry></mxCell><mxCell id="10" edge="1" source="4" target="5" parent="1" value="Transfer4"><mxGeometry as="geometry"><Array as="points"><Object x="200" y="180"/></Array></mxGeometry></mxCell><mxCell id="11" edge="1" source="4" target="6" parent="1" value="Transfer5"><mxGeometry as="geometry" relative="1" y="-10"><Array as="points"><Object x="460" y="155"/></Array></mxGeometry></mxCell></root></mxGraphModel>');
					// var node = doc.documentElement;
					// sender.readGraphModel(node);
					// alert('open 테스트');
				};
				
				editor.addListener(mxEvent.OPEN, funct);
				
				// Prints the current root in the window title if the
				// current root of the graph changes (drilling).
				editor.addListener(mxEvent.ROOT, funct);
				funct(editor);
				
				// Displays version in statusbar
				editor.setStatus('mxGraph '+mxClient.VERSION);

				// var node = mxUtils.parseXml('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" vertex="1" parent="1" value="Interval 1"><mxGeometry x="380" y="0" width="140" height="30" as="geometry"/></mxCell><mxCell id="3" vertex="1" parent="1" value="Interval 2"><mxGeometry x="200" y="80" width="380" height="30" as="geometry"/></mxCell><mxCell id="4" vertex="1" parent="1" value="Interval 3"><mxGeometry x="40" y="140" width="260" height="30" as="geometry"/></mxCell><mxCell id="5" vertex="1" parent="1" value="Interval 4"><mxGeometry x="120" y="200" width="240" height="30" as="geometry"/></mxCell><mxCell id="6" vertex="1" parent="1" value="Interval 5"><mxGeometry x="420" y="260" width="80" height="30" as="geometry"/></mxCell><mxCell id="7" edge="1" source="2" target="3" parent="1" value="Transfer1"><mxGeometry as="geometry"><Array as="points"><Object x="420" y="60"/></Array></mxGeometry></mxCell><mxCell id="8" edge="1" source="2" target="6" parent="1" value=""><mxGeometry as="geometry" relative="1" y="-30"><Array as="points"><Object x="600" y="60"/></Array></mxGeometry></mxCell><mxCell id="9" edge="1" source="3" target="4" parent="1" value="Transfer3"><mxGeometry as="geometry"><Array as="points"><Object x="260" y="120"/></Array></mxGeometry></mxCell><mxCell id="10" edge="1" source="4" target="5" parent="1" value="Transfer4"><mxGeometry as="geometry"><Array as="points"><Object x="200" y="180"/></Array></mxGeometry></mxCell><mxCell id="11" edge="1" source="4" target="6" parent="1" value="Transfer5"><mxGeometry as="geometry" relative="1" y="-10"><Array as="points"><Object x="460" y="155"/></Array></mxGeometry></mxCell></root></mxGraphModel>');
				// var dec = new mxCodec(node.ownerDocument);
  		// 		dec.decode(node, editor.graph.getModel());

				//editor.readGraphModel(mxUtils.parseXml('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" vertex="1" parent="1" value="Interval 1"><mxGeometry x="380" y="0" width="140" height="30" as="geometry"/></mxCell><mxCell id="3" vertex="1" parent="1" value="Interval 2"><mxGeometry x="200" y="80" width="380" height="30" as="geometry"/></mxCell><mxCell id="4" vertex="1" parent="1" value="Interval 3"><mxGeometry x="40" y="140" width="260" height="30" as="geometry"/></mxCell><mxCell id="5" vertex="1" parent="1" value="Interval 4"><mxGeometry x="120" y="200" width="240" height="30" as="geometry"/></mxCell><mxCell id="6" vertex="1" parent="1" value="Interval 5"><mxGeometry x="420" y="260" width="80" height="30" as="geometry"/></mxCell><mxCell id="7" edge="1" source="2" target="3" parent="1" value="Transfer1"><mxGeometry as="geometry"><Array as="points"><Object x="420" y="60"/></Array></mxGeometry></mxCell><mxCell id="8" edge="1" source="2" target="6" parent="1" value=""><mxGeometry as="geometry" relative="1" y="-30"><Array as="points"><Object x="600" y="60"/></Array></mxGeometry></mxCell><mxCell id="9" edge="1" source="3" target="4" parent="1" value="Transfer3"><mxGeometry as="geometry"><Array as="points"><Object x="260" y="120"/></Array></mxGeometry></mxCell><mxCell id="10" edge="1" source="4" target="5" parent="1" value="Transfer4"><mxGeometry as="geometry"><Array as="points"><Object x="200" y="180"/></Array></mxGeometry></mxCell><mxCell id="11" edge="1" source="4" target="6" parent="1" value="Transfer5"><mxGeometry as="geometry" relative="1" y="-10"><Array as="points"><Object x="460" y="155"/></Array></mxGeometry></mxCell></root></mxGraphModel>');

				// Shows the application
				hideSplash();
			}
		}
		catch (e)
		{
			hideSplash();

			// Shows an error message if the editor cannot start
			mxUtils.alert('Cannot start application: ' + e.message);
			throw e; // for debugging
		}

		// var doc = mxUtils.parseXml('<mxGraphModel><root><Diagram label="My Diagram" href="http://www.jgraph.com/" id="0"><mxCell/></Diagram><Layer label="Default Layer" id="1"><mxCell parent="0"/></Layer><Container label="Container" href="" id="2"><mxCell style="swimlane" vertex="1" connectable="0" parent="1"><mxGeometry x="160" y="60" width="200" height="200" as="geometry"/></mxCell></Container></root></mxGraphModel>');
		// var codec = new mxCodec(doc);
		// codec.decode(doc.documentElement, editor.graph.getModel());

		return editor;
	}

}
