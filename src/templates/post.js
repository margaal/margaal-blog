import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';

import {Layout} from '../components/index';
import {htmlToReact, withPrefix} from '../utils';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;


export default class Post extends React.Component {
  
   disqusConfig = { identifier: this.props.pageContext.id,
            title: this.props.pageContext.frontmatter.title,    };
    render() {
        return (
            <Layout {...this.props}>
          
            <div className="inner outer">
              <article className="post post-full">
              
                <header className="post-header inner-sm">
                  <h1 className="post-title line-top">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}
                  </div>
                  )}
                   <time className="published" dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                </header>
                {_.get(this.props, 'pageContext.frontmatter.image', null) && (
                <div className="post-image">
                  <img src={withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null))} alt={_.get(this.props, 'pageContext.frontmatter.image_alt', null)} />
                </div>
                )}
                <div className="post-content inner-sm">
                  {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                </div>
                <footer className="post-meta inner-sm">
                  <Disqus config={this.disqusConfig} />  
                </footer>
                
              </article>
            </div>
            </Layout>
        );
    }
}
