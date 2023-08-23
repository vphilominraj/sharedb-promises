'use strict';

const Debug				= require('debug');

class Connection {
	constructor(connection) {
		this.connection = connection;
		this.debug = new Debug('sharedb-promises:connection:' );
		return this;
	}
	
	async fetchSnapshot() {
		const { connection } = this;
		const [ collection, id, version ] = arguments;

		let _version = version || null; // if undefined needs to be forced to null;
		if(_version) {
			_version = parseInt(_version);
		}

		return new Promise((resolve, reject) => {
			this.debug("fetchSnapshot >", collection, id, _version);
			connection.fetchSnapshot(collection, id, _version, (err, snapshot) => {
				if (err) {
					this.error("fetchSnapshot !", collection, id, _version, err, err.stack);
					return reject(err);
				}
				this.debug("fetchSnapshot <", collection, id, _version, snapshot);
				return resolve(snapshot);
			});
		});
	}

}

module.exports = Connection;


