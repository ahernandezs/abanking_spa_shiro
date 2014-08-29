package mx.com.prosa.app.mail.security;

import org.apache.log4j.Logger;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListenerAdapter;

public class CustomSessionListener extends SessionListenerAdapter {
    private static final Logger logger = Logger.getLogger(CustomSessionListener.class);
    
    @Override
    public void onExpiration(Session session) {
	super.onExpiration(session);

    }

    @Override
    public void onStart(Session session) {
	super.onStart(session);
	logger.info("On start =================================> (" + session.getId() + ")");
    }

    @Override
    public void onStop(Session session) {
	super.onStop(session);
	logger.info("On stop =================================> (" + session.getId() + ")");
    }

}
